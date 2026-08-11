FROM nginx:alpine

COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

ENV PORT=5001

EXPOSE 5001
CMD ["nginx", "-g", "daemon off;"]
