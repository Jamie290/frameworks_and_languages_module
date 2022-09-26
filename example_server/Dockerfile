ARG PYTHON_IMAGE_VERSION=3.10
FROM python:${PYTHON_IMAGE_VERSION}-alpine as base
    ARG PYTHON_IMAGE_VERSION
    ENV PATH_SITE_PACKAGES=/usr/local/lib/python${PYTHON_IMAGE_VERSION}/site-packages/

    WORKDIR /app/
# Hello
FROM base as python_dependencies_test
    RUN pip install pytest

FROM base as code
    COPY main.py .
    COPY /app ./app

FROM code as test
    COPY --from=python_dependencies_test ${PATH_SITE_PACKAGES} ${PATH_SITE_PACKAGES}
    COPY --from=python_dependencies_test /usr/local/bin/pytest /usr/local/bin/pytest
    COPY ./pytest.ini ./
    RUN pytest

FROM code as main
    CMD ["python3", "main.py"]
    # TODO remove
    #CMD ["python3", "-m", "http.server"]
