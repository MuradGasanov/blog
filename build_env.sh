#!/bin/bash
echo $0: Creating virtual environment
virtualenv --prompt="<blog_env>" ../blog_env
mkdir ../blog_logs
mkdir ../blog_pids
mkdir ../blog_static/static
mkdir ../blog_static/media
echo $0: Installing dependencies
source ../blog_env/bin/activate
export PIP_REQUIRE_VIRTUALENV=true
../blog_env/bin/pip install --requirement=./requirements.conf --log=../blog_logs/build_pip_packages.log
echo $0: Making virtual environment relocatable
virtualenv --relocatable ../blog_env
echo $0: Creating virtual environment finished.