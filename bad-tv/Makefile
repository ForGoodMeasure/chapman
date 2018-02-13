# makefile to automatize simple operations

server:
	python -m SimpleHTTPServer

deploy:
	AWS_PROFILE=fgm-dev aws s3 cp --recursive --acl public-read . s3://chapman-bad-tv/
