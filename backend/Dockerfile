FROM python:3.10

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY main.py main.py
COPY open_files open_files

RUN useradd backend
RUN chown backend:backend /backend
RUN echo "SfeduCTF{flag_xml_1}" > /flag_xml.txt
RUN echo "SfeduCTF{flag_pt_1}" > /flag_pt.txt
ENV FLAG_SSTI="sfeduCTF{shabl0n_vu1ner@blity}"
RUN chown backend:backend /flag_xml.txt
RUN chown backend:backend /flag_pt.txt

USER backend
CMD ["python3.10", "main.py"]