FROM python:latest

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=app.py

EXPOSE 8000

CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]