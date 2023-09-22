import PageTitle from '@/components/PageTitle'
import Image from 'next/image'

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))

  const response = await fetch(
    `http://frontcode.pagina-oficial.com/wp-json/wp/v2/posts?slug=${slug}`
  )
  const responseData = await response.json()

  if (responseData === -1) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Algo errado não esta certo!
          <span role="img" aria-label="roadwork sign"></span>
        </PageTitle>
      </div>
    )
  }
  return (
    <>
      <div className="text-center pt-6 md:pt-6">
        <p className="text-sm md:text-base text-green-500 font-bold">
          {responseData[0].date} <span className="text-gray-900">/</span> GETTING STARTED
        </p>
        <h1 className="font-bold break-normal text-3xl md:text-5xl">
          {responseData[0].title.rendered}
        </h1>
      </div>

      <div className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded">
        <p
          className="p-6 flex flex-col gap-4 bg-slate-100 dark:bg-slate-900"
          dangerouslySetInnerHTML={{ __html: responseData[0].content.rendered }}
        ></p>
      </div>
    </>
  )
}
