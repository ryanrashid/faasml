FROM python:latest

# set a directory for the app
WORKDIR /usr/src/app

# copy all the files to the container
COPY . .

# install dependencies
RUN pip install flask
RUN pip install requests

# tell the port number the container should expose
EXPOSE 5000

# run the command
CMD ["python", "./app.py"]