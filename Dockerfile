FROM node:lts

WORKDIR /auto-trade-front

# timezone
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ARG NEXT_PUBLIC_API_URL=https://s6napi.duckdns.org

COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]