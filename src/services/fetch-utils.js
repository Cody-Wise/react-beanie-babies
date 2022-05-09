import { client, checkError } from './client';

export async function getBeanieBabies(from = 0, to = 100) {
  const NUM_PER_PAGE = 100;
  const response = await client
    .from('beanie_babies')
    .select('*', { count: 'exact' })
    .range(from, to);

  const lastPage = Math.ceil(response.count / NUM_PER_PAGE);

  return { ...response, lastPage };
}

export async function getSingleBeanie(id) {
  const response = await client.from('beanie_babies').select().match({ id }).single();

  return checkError(response);
}
