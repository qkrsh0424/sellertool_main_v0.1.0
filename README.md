# sellertool_main_v0.0.1

셀러들을 위한 도구 프로젝트 SellerTool 입니다.

제품 원가에 대한 계산을 위해 마진율 계산기를 제공하고 있으며,

네이버 검색 API를 기반으로 네이버 쇼핑 순위를 알아볼수 있습니다.

1. 먼저 application.properties 세팅을 완료해주세요.

    # SERVER LISTENER SETTING
    server.port=8081
    spring.devtools.livereload.enabled=true

    # MYSQL SETTING
    spring.datasource.url=**DB URL**
    spring.datasource.username=**DB USERNAME**
    spring.datasource.password=**DB PASSWORD**

    # REDIS SETTING (SESSION)
    spring.session.store-type=**redis or in-memory DB**
    spring.redis.host=**ADDRESS**
    spring.redis.port=**PORT**
    # COOKIE
    server.servlet.session.cookie.name=**SESSION NAME**

    # NAVER API SERVICE SETTING
    naver.clientId = **NAVER API CLIENT ID**
    naver.clientSecret = **NAVER API CLIENT PW**

    # APPLICATION ENVIRONMENT SETTING
    app.environment=**development or production**
    app.environment.development.login.url=**DEVELOPMENT LOGIN APP URL**
    app.environment.production.login.url=**PRODUCTION LOGIN APP URL**
    app.environment.static.version=**STATIC FILE VERSION**

