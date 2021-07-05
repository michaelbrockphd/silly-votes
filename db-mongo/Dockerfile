FROM mongo:4.4.6-bionic

WORKDIR /db-mongo/

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=babelfish

COPY mongo-init.js /docker-entrypoint-initdb.d/

# Small safe-guard to ensure that no permission errors occur and prevent this
# script from running.

RUN chmod a+rwx /docker-entrypoint-initdb.d/mongo-init.js

CMD ["mongod", "--auth"]
