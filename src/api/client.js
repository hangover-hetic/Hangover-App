import axios from 'axios';

const baseUrl = 'https://hangover.timotheedurand.fr/api/';

const appUrl = 'https://hangover.timotheedurand.fr/';

const TASK_NAME = 'LOCATION_TASK_NAME';

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTcxODkyMzEsImV4cCI6MTY4NzE5MjgzMSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfT1JHQU5JU0FUT1IiLCJST0xFX1VTRVIiXSwiZW1haWwiOiJhZG1pbkBoYW5nb3Zlci5jb20ifQ.wiq0KsxykMmfyXxWBzYsvJyRhGJCESrosy4ZhRdsQ1doGQnW0GeNGMAZ2D_KvMlEAbywcjVjocHUQ7vxqwOLqFjSBgkWhzJFr7jryJhe282f3XFcNDGTSNlEjzdQV6dVCiTxLxnpQxgQXzgtKCd-XhP3gMwweUGmoZqVY40DEsU7uU38YyZyFRTQKMqay2d5Mr6wGecZf6tq5JkP6_E8GvolXjRFJKbOmOagRwVdCdRnJKtKHY2WFFtUSDQDQ9zyqw-1_ChELXhxuS_c2p_y1krCu9ij5ueif1PgFv88i80hI8L-Mv1Xx7YfmLq2HV0CQeMPCVFKdx5DOk_tkCB29Q',
    Accept: 'application/json',
  },
});

export { TASK_NAME, client, baseUrl, appUrl };
