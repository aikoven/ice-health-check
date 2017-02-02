# Ice Health Check [![npm version][npm-image]][npm-url]

Docker health check script for ZeroC ICE.

## Usage

```Dockerfile
RUN npm install -g ice-health-check

HEALTHCHECK CMD ["ice-health-check", "category/name:tcp -p <port>"]
```

[npm-image]: https://badge.fury.io/js/ice-health-check.svg
[npm-url]: https://badge.fury.io/js/ice-health-check

