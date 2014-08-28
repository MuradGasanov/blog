# -*- coding: utf-8 -*-
import datetime
import urllib
import cStringIO
import math
import json

from PIL import Image
from BeautifulSoup import BeautifulSoup
from django.db.models import Q
from django.http.response import HttpResponse, HttpResponseForbidden
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt

from main.additionally.common import *

from blog import settings
from main import models


def index(request):
    return render_to_response("post-list.html")


def get_posts(request):
    count_per_page = 6
    posts = models.Post.objects.all()

    page = int(request.GET.get("page", 1))
    skip = (page-1)*count_per_page
    take = skip+count_per_page
    query = request.GET.get("q", "")
    category = int(request.GET.get("category", 0))
    tag = request.GET.get("tag", "")

    if category:
        posts = posts.filter(category_id=int(category))

    if tag:
        posts = posts.filter(tags__name=tag)

    if query:
        posts = posts.filter(Q(title__icontains=query) | Q(text__icontains=query))

    max_pages = int(math.ceil(len(posts)/float(count_per_page)))
    posts = posts[skip:take]

    return render_to_response("items.html", {"posts": posts, "max_pages": max_pages})


def post(request, pk):
    pk = int(pk)

    post = models.Post.objects.get(id=pk)

    try:
        next = post.get_next_by_date()
        next = "/post/%d/" % next.id
    except:
        next = ""

    try:
        prev = post.get_previous_by_date()
        prev = "/post/%d/" % prev.id
    except:
        prev = ""

    return render_to_response("post.html", {"post": post, "next": next, "prev": prev})


def add_post(request):
    return render_to_response("post-form.html")


@csrf_exempt
def upload_image(request):
    if "upload_img" in request.FILES:
        img = request.FILES.get("upload_img")
    elif "upload_url" in request.POST:
        try:
            file = cStringIO.StringIO(urllib.urlopen(request.POST.get("upload_url")).read())
            img = Image.open(file)
        except:
            return HttpResponseForbidden()
    else:
        return HttpResponseForbidden()
    if not img.content_type.startswith("image"):
        return HttpResponseForbidden()
    dir_name = settings.path(
        os.path.join(
            settings.MEDIA_ROOT,
            datetime.datetime.now().strftime("%Y-%m-%d")))
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    img_file_name = settings.path(
        os.path.join(dir_name, transliterate(img._get_name())))
    img_file_name = uniquify(img_file_name)
    img_file = open(img_file_name, 'wb')
    os.chmod(img_file_name, 0755)
    for chunk in img.chunks():
        img_file.write(chunk)
    img_file.close()
    img_url = settings.path(os.path.join(
        settings.MEDIA_URL, get_file_with_parents(img_file.name)))
    return HttpResponse(json.dumps({"data": img_url}), content_type="application/json")


def tags(request):
    tag = request.GET.get("tag", "")

    tag_list = list(models.Tag.objects.filter(name__icontains=tag).values_list("name", flat=True))

    if tag_list:
        return HttpResponse(json.dumps(tag_list), content_type="application/json")
    else:
        return HttpResponse("[]", content_type="application/json")


def create_post(request):
    item = json.loads(request.POST.get("item"))

    category = item.get("category")
    if type(category) == unicode and len(category) != 0:
        category = models.Category.objects.create(name=category)
    elif type(category) == int:
        category = models.Category.objects.get(id=category)
    else:
        return HttpResponseForbidden()

    post = models.Post.objects.create(
        title=item.get("title"),
        text=item.get("text"),
        is_public=item.get("is_public"),
        date=datetime.datetime.now(),
        category=category
    )
    if item.get("use_post_image"):
        soup = BeautifulSoup(post.text)
        try:
            post_img = soup.findAll('img')[0]['src']
            if post_img:
                post.post_image = post_img
        except:
            pass
    else:
        post.post_image = None
    post.save()

    tags = []
    for t in item.get("tags", []):
        try:
            tag, created = models.Tag.objects.get_or_create(name=t)
        except:
            tag = None
        if tag:
            tags.append(tag)
    post.tags.add(*tags)
    return HttpResponse(json.dumps({"id": post.id}), content_type="application/json")


def update_post(request):
    item = json.loads(request.POST.get("item"))

    category = item.get("category")
    if type(category) == unicode and len(category) != 0:
        category = models.Category.objects.create(name=category)
    elif type(category) == int:
        category = models.Category.objects.get(id=category)
    else:
        return HttpResponseForbidden()

    post = models.Post.objects.get(id=int(item.get("id")))

    post.title = item.get("title")
    post.text = item.get("text")
    post.is_public = item.get("is_public")
    # post.date = datetime.datetime.now()
    post.category = category

    if item.get("use_post_image"):
        soup = BeautifulSoup(post.text)
        try:
            post_img = soup.findAll('img')[0]['src']
            if post_img:
                post.post_image = post_img
        except:
            pass
    else:
        post.post_image = None
    post.save()

    tags = []
    for t in item.get("tags", []):
        try:
            tag, created = models.Tag.objects.get_or_create(name=t)
        except:
            tag = None
        if tag:
            tags.append(tag)
    post.tags.add(*tags)
    return HttpResponse(json.dumps({"id": post.id}), content_type="application/json")


def read_post(request):
    item = json.loads(request.POST.get("item"))
    p = models.Post.objects.get(id=int(item.get("id")))
    pr = {
        "id": p.id,
        "title": p.title,
        "text": p.text,
        "category": p.category_id,
        "tags": [t.name for t in p.tags.all()],
        "is_public": p.is_public,
        "use_post_image": bool(p.post_image)
    }
    return HttpResponse(json.dumps(pr), content_type="application/json")


def create_fixture(request):
    tag1 = models.Tag.objects.create(name="tag 1")
    tag2 = models.Tag.objects.create(name="tag 2")
    category = models.Category.objects.create(name="Category")
    for i in range(1, 100):
        if i % 2 == 0:
            img = ""
            text='<h2 style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2><div class="mrge-content-block mrge-left-side" style="max-width: 350px; max-height: 270px;" contenteditable="false"><div class="mrge-content-block-item" style="max-width: 350px; max-height: 270px;"><img src="/temp_pic/temp-pic-1.jpg" style="max-width: 350px; max-height: 270px;"></div></div><p> Aenean non augue eget odio sagittis accumsan vitae quis felis. In luctus lectus mi, commodo dignissim velit venenatis nec. Mauris id augue odio. Nulla sollicitudin lorem ac nibh consequat, vitae interdum nulla mattis. Etiam viverra dui in est aliquet, lacinia semper felis egestas. Donec iaculis bibendum quam ut viverra. Suspendisse non imperdiet enim. Nunc ut lacus sed nibh iaculis ornare. Nullam sit amet nunc massa. Ut tincidunt posuere viverra. Cras vel luctus ante. Ut iaculis vestibulum dolor eu bibendum. Praesent et mauris tellus. Quisque ac lectus ipsum.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eu ante id leo pellentesque malesuada quis non lorem. Nam commodo et nulla nec consectetur. Sed non dapibus nisl. Praesent eget facilisis neque. Nulla in auctor tellus. Proin ac sem congue dolor elementum condimentum non et sem.</p><h3>Curabitur scelerisque leo lorem, non hendrerit lacus hendrerit at.</h3><div class="mrge-content-block mrge-left-side" style="max-width: 350px; max-height: 270px;" contenteditable="false"><div class="mrge-content-block-item" style="max-width: 350px; max-height: 270px;"><cuttag/><iframe src="//www.youtube.com/embed/oGgIYyG4u0k?feature=player_detailpage&amp;wmode=opaque" allowfullscreen="" wmode="Opaque" style="width: 350px; height: 205px;" frameborder="0" height="360" width="640"></iframe></div></div><p> Etiam auctor augue non augue lacinia, sit amet sollicitudin dolor rhoncus. Sed feugiat nulla nec lacus volutpat aliquet. Aenean sapien erat, pulvinar sed fringilla in, scelerisque quis tellus. Ut blandit vehicula sodales. Vivamus placerat urna dolor, eget cursus est commodo at. Nullam vitae libero mi.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras lobortis vitae mi nec placerat. Fusce aliquam elit eget luctus tristique. Proin ultricies vehicula leo, id luctus dui ultricies et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam eget iaculis lorem, in imperdiet sapien. Aenean a nibh cursus, ultricies metus ut, consectetur mi. Nulla facilisi. Mauris placerat aliquam lorem ac lacinia. Sed a nulla viverra, suscipit orci quis, gravida dui. Quisque non massa sem</p><p>Mauris scelerisque, lacus eu dictum pharetra, sem lacus feugiat justo, ut eleifend leo mi tristique mauris. Sed varius pretium porta. Aenean nec neque vitae metus venenatis dapibus vel convallis massa. Etiam id mauris ullamcorper, dapibus turpis nec, volutpat magna. Vestibulum mollis pharetra adipiscing. Quisque euismod mi fringilla mi ultrices venenatis. Ut vel orci sapien. Nulla tempus metus eleifend tempor euismod.</p><h3>Duis laoreet vulputate velit non vulputate.</h3><div class="mrge-content-block mrge-left-side" style="max-width: 350px; max-height: 270px;" contenteditable="false"><div class="mrge-content-block-item" style="max-width: 350px; max-height: 270px;"><img src="/temp_pic/temp-pic-2.jpg" style="max-width: 350px; max-height: 270px;"></div></div><p> In non enim eu leo iaculis venenatis in iaculis purus. Maecenas vitae placerat dui. Sed mattis felis lacinia, pellentesque nisl nec, scelerisque nulla. Fusce lobortis aliquam massa eget fermentum. Cras quis tellus nec ligula tristique pretium. Nulla non urna quis sapien luctus aliquet ut et turpis. Donec consectetur ac velit at rutrum. Nullam feugiat, neque ac lacinia vehicula, elit orci commodo purus, nec semper velit nibh in turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sed lectus orci. Pellentesque laoreet non ipsum nec ultricies.</p><h3>Curabitur ullamcorper hendrerit felis.</h3><p> Sed scelerisque eleifend lectus, nec molestie tortor vulputate vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus eu lectus at odio tempus suscipit. Nam tincidunt luctus posuere. Sed eget velit commodo, dictum purus porttitor, interdum tortor. Sed luctus augue non massa suscipit tincidunt. Donec ac pulvinar ligula. Vivamus convallis, nunc eu iaculis scelerisque, lectus dui pretium metus, quis egestas dui est sed mauris. Cras id velit aliquam, molestie arcu eu, ornare massa. Aliquam tempus accumsan purus, laoreet iaculis ante ultrices ut.</p><p>Nulla ut feugiat purus, vel ullamcorper mi. Suspendisse dapibus elit ut congue mattis. Nunc malesuada ut dolor vitae cursus. Morbi at facilisis erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam sodales neque et leo fermentum imperdiet. In id ipsum eu nisl blandit iaculis. Cras tristique lectus et ipsum mollis commodo. Cras id dui velit. Etiam volutpat eleifend justo. Praesent et sodales tellus, quis fringilla quam. Ut nec elementum enim. Nam fermentum massa quis velit viverra scelerisque. In hac habitasse platea dictumst. Vestibulum aliquam risus nec ante elementum pulvinar. Phasellus malesuada tellus lacus, et vehicula est convallis in.</p>',
        else:
            img = "/static/random.jpg"
            text='<h2 style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2><div class="mrge-content-block mrge-left-side" style="max-width: 350px; max-height: 270px;" contenteditable="false"><div class="mrge-content-block-item" style="max-width: 350px; max-height: 270px;"><img src="/temp_pic/temp-pic-1.jpg" style="max-width: 350px; max-height: 270px;"></div></div><p> Aenean non augue eget odio sagittis accumsan vitae quis felis. In luctus lectus mi, commodo dignissim velit venenatis nec. Mauris id augue odio. Nulla sollicitudin lorem ac nibh consequat, vitae interdum nulla mattis. Etiam viverra dui in est aliquet, lacinia semper felis egestas. Donec iaculis bibendum quam ut viverra. Suspendisse non imperdiet enim. Nunc ut lacus sed nibh iaculis ornare. Nullam sit amet nunc massa. Ut tincidunt posuere viverra. Cras vel luctus ante. Ut iaculis vestibulum dolor eu bibendum. Praesent et mauris tellus. Quisque ac lectus ipsum.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eu ante id leo pellentesque malesuada quis non lorem. Nam commodo et nulla nec consectetur. <cuttag/>Sed non dapibus nisl. Praesent eget facilisis neque. Nulla in auctor tellus. Proin ac sem congue dolor elementum condimentum non et sem.</p><h3>Curabitur scelerisque leo lorem, non hendrerit lacus hendrerit at.</h3><div class="mrge-content-block mrge-left-side" style="max-width: 350px; max-height: 270px;" contenteditable="false"><div class="mrge-content-block-item" style="max-width: 350px; max-height: 270px;"><iframe src="//www.youtube.com/embed/oGgIYyG4u0k?feature=player_detailpage&amp;wmode=opaque" allowfullscreen="" wmode="Opaque" style="width: 350px; height: 205px;" frameborder="0" height="360" width="640"></iframe></div></div><p> Etiam auctor augue non augue lacinia, sit amet sollicitudin dolor rhoncus. Sed feugiat nulla nec lacus volutpat aliquet. Aenean sapien erat, pulvinar sed fringilla in, scelerisque quis tellus. Ut blandit vehicula sodales. Vivamus placerat urna dolor, eget cursus est commodo at. Nullam vitae libero mi.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras lobortis vitae mi nec placerat. Fusce aliquam elit eget luctus tristique. Proin ultricies vehicula leo, id luctus dui ultricies et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam eget iaculis lorem, in imperdiet sapien. Aenean a nibh cursus, ultricies metus ut, consectetur mi. Nulla facilisi. Mauris placerat aliquam lorem ac lacinia. Sed a nulla viverra, suscipit orci quis, gravida dui. Quisque non massa sem</p><p>Mauris scelerisque, lacus eu dictum pharetra, sem lacus feugiat justo, ut eleifend leo mi tristique mauris. Sed varius pretium porta. Aenean nec neque vitae metus venenatis dapibus vel convallis massa. Etiam id mauris ullamcorper, dapibus turpis nec, volutpat magna. Vestibulum mollis pharetra adipiscing. Quisque euismod mi fringilla mi ultrices venenatis. Ut vel orci sapien. Nulla tempus metus eleifend tempor euismod.</p><h3>Duis laoreet vulputate velit non vulputate.</h3><div class="mrge-content-block mrge-left-side" style="max-width: 350px; max-height: 270px;" contenteditable="false"><div class="mrge-content-block-item" style="max-width: 350px; max-height: 270px;"><img src="/temp_pic/temp-pic-2.jpg" style="max-width: 350px; max-height: 270px;"></div></div><p> In non enim eu leo iaculis venenatis in iaculis purus. Maecenas vitae placerat dui. Sed mattis felis lacinia, pellentesque nisl nec, scelerisque nulla. Fusce lobortis aliquam massa eget fermentum. Cras quis tellus nec ligula tristique pretium. Nulla non urna quis sapien luctus aliquet ut et turpis. Donec consectetur ac velit at rutrum. Nullam feugiat, neque ac lacinia vehicula, elit orci commodo purus, nec semper velit nibh in turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sed lectus orci. Pellentesque laoreet non ipsum nec ultricies.</p><h3>Curabitur ullamcorper hendrerit felis.</h3><p> Sed scelerisque eleifend lectus, nec molestie tortor vulputate vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus eu lectus at odio tempus suscipit. Nam tincidunt luctus posuere. Sed eget velit commodo, dictum purus porttitor, interdum tortor. Sed luctus augue non massa suscipit tincidunt. Donec ac pulvinar ligula. Vivamus convallis, nunc eu iaculis scelerisque, lectus dui pretium metus, quis egestas dui est sed mauris. Cras id velit aliquam, molestie arcu eu, ornare massa. Aliquam tempus accumsan purus, laoreet iaculis ante ultrices ut.</p><p>Nulla ut feugiat purus, vel ullamcorper mi. Suspendisse dapibus elit ut congue mattis. Nunc malesuada ut dolor vitae cursus. Morbi at facilisis erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam sodales neque et leo fermentum imperdiet. In id ipsum eu nisl blandit iaculis. Cras tristique lectus et ipsum mollis commodo. Cras id dui velit. Etiam volutpat eleifend justo. Praesent et sodales tellus, quis fringilla quam. Ut nec elementum enim. Nam fermentum massa quis velit viverra scelerisque. In hac habitasse platea dictumst. Vestibulum aliquam risus nec ante elementum pulvinar. Phasellus malesuada tellus lacus, et vehicula est convallis in.</p>',

        new = models.Post.objects.create(
            title=u"Заголовок для статьи %d" % i,
            text=text,
            date=datetime.datetime.now(),
            category=category,
            post_image=img,
            is_public=True
        )
        new.save()
        new.tags.add(tag1)
        new.tags.add(tag2)
    return HttpResponse("done")
