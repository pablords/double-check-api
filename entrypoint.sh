#!/bin/bash
set -e

echo "$ENVIRONMENT"
echo "$APP_PATH"



if [ -z "$APP_PATH" ]; then APP_PATH=./; fi

if [ "$ENVIRONMENT" == "PRODUCTION" ]; then
    source $APP_PATH/.env.prod
fi

if [ "$ENVIRONMENT" == "TEST" ]; then
    source $APP_PATH/.env.test
fi

if [ "$ENVIRONMENT" == "DEVELOPMENT" ]; then
    source $APP_PATH/.env.dev
fi



if [ "$ENVIRONMENT" == "DEVELOPMENT" ]; then
    echo "npm install $APP_PATH"
    npm install --prefix $APP_PATH
    node ace generate:key
    cd $APP_PATH
    sed -i 1,1000d .env
    cat .env.dev >> .env
fi


if [ "$ENVIRONMENT" == "TEST" ]; then
    echo "INICIANDO BUILD DA APLICAÇAO"
    node ace generate:key
    npm run build --prefix $APP_PATH
    npm run production --prefix $APP_PATH/build
    echo "CRIANDO ARQUIVO .ENV"
    cd $APP_PATH
    cat .env.test >> ./build/.env
fi


if [ "$ENVIRONMENT" == "PRODUCTION" ]; then
    echo "INICIANDO BUILD DA APLICAÇAO"
    node ace generate:key
    npm run build --prefix $APP_PATH
    npm run production --prefix $APP_PATH/build
    echo "CRIANDO ARQUIVO .ENV"
    cat .env.prod >> ./build/.env
fi



echo "Executando comando inicial do container"
exec  "$@"