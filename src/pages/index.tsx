import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { SinglePost } from "../../components/Post/SinglePost";
import { Tag } from "../../components/Tag/Tag";
import { getAllTags, getPostsTopPage } from "../../lib/notionAPI";
import { Motions } from "../utils/Motions";

// 4つずつデータを取得↓
export const getStaticProps: GetStaticProps = async () => {
  const sixPosts = await getPostsTopPage(4);
  const allTags = await getAllTags();

  return {
    props: {
      sixPosts,
      allTags,
    },
    // ISRを使用、10秒ごとに画面（HTML）を更新する。
    revalidate: 60 * 60 * 12,
  };
};

export default function Home({ sixPosts, allTags }) {
  // console.log(fourPosts);
  return (
    <>
      <div className="container h-full w-full mx-auto xl:col-span-10">
        <Head>
          <title>上野のプログラミング奮闘生活！</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@motoki_1995" />
          <meta name="twitter:domain" content="uemoto-notion.vercel.app" />
          <meta name="twitter:title" content="プログラミング奮闘生活！" />
          <meta
            name="twitter:description"
            content="このサイトはエンジニア未経験転職を目指す人のサイトです。"
          />
          <meta
            name="twitter:image"
            content="https://uemoto-notion.vercel.app/public/image3.png"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Motions>
          <main className="container w-full mt-16">
            <p className="m-0 text-center text-green-600">
              ※どこを押してもリンク飛べるようにしました。🙇‍♂️
            </p>
            <section className="sm:grid lg:grid-cols-2 md:grid-cols-2 w-5/6 gap-4 xl:w-12/12 mx-auto">
              {sixPosts.map((post) => (
                <div key={post.id}>
                  <SinglePost
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                    slug={post.slug}
                    image={post.image}
                    isPagenationPage={true}
                  />
                </div>
              ))}
            </section>
            <Link
              href="/posts/page/1"
              className="mb-6 rounded-md px-5 flex justify-center"
            >
              <span className="bg-sky-400 p-3 rounded-3xl text-xl text-white hover:bg-sky-700 transition duration-300">
                一覧はこちら
              </span>
            </Link>
          </main>
        </Motions>
      </div>
      <Tag tags={allTags} />
    </>
  );
}
