FROM python:3.10

WORKDIR /backend
COPY main.py main.py

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

RUN useradd backend
RUN chown backend:backend /backend
RUN echo "SfeduCTF{flag_xml_1}" > /flag_xml.txt
RUN chown backend:backend /flag_xml.txt

USER backend
CMD ["python3.10", "main.py"]