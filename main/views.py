from django.shortcuts import render, render_to_response
from main import models
import json


def index(request):
    return render_to_response("post.html")


def get_posts(request):
    options = None
    if "options" in request.POST:
        options = json.loads(request.POST.get("options"))
    terms = models.Post.objects.all()
    total = terms.count()
    if options:
        skip = options.get("skip", None)
        take = options.get("take", None)
        query = options.get("query", "")
        category = options.get("category", 0)

        if query:
            terms = terms.filter(title__istartswith=query)
        else:
            terms = terms.filter(title__icontains=query)
        if category:
            terms = terms.filter(project_id=int(category))
        total = terms.count()
        terms = terms[skip:skip + take]
    # items = list(terms.values("title", "description", "author__id", "author__name"))
    items = []
    for term in terms:
        items.append({
            "id": term.id,
            "title": term.title,
            "description": term.description,
            "author": term.author.username,
            "author_id": term.author.id,
            "project": term.project.name if term.project else "",
            "project_id": term.project.id if term.project else "",
            "create_at": term.create_at,
            "can_edit": (term.author.id == request.user.id) or request.user.is_staff
        })
    return HttpResponse(json.dumps({"items": items, "total": total}, default=dt_handler),
                        content_type="application/json")