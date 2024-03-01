FROM python:3.8-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app



COPY . /app

RUN pip install --no-cache-dir gunicorn \
    && pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir uvicorn

RUN python manage.py collectstatic --noinput

RUN python manage.py test testing/folder

CMD ["python","manage.py","runserver","0.0.0.0:8000"]
