import Link from "next/link";
import React from "react";

// 型定義
type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPagenationPage: boolean;
  image: string;
};

export const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPagenationPage, image } =
    props;
  return (
    <>
      {isPagenationPage ? (
        <section className="bg-gradient-to-r from-sky-700 to-indigo-500 mb-8 mx-auto rounded-md p-5 shadow-2xl shadow-sky-500 hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center justify-between">
            <img
              className="w-72 h-52 object-cover mx-auto rounded-md bg-cover"
              src={image}
              alt={title}
            />
            <div className="text-center">
              <h2 className="text-gray-100 text-2xl font-medium mb-2">
                {/* titleを押すと遷移するaタグだからインライン要素なので子要素がないように！ */}
                <Link href={`/posts/${slug}`} className="animate-pulse text-lg">
                  {title}
                </Link>
              </h2>
              <div className="text-gray-400 mr-2 mb-4 text-md">
                投稿日: {date}
              </div>
              {tags.map((tag: string, index: number) => (
                <span
                  className="text-white bg-gray-500 text-xs rounded-xl px-2 pb-1 font-medium mr-2 hover:bg-sky-700"
                  key={index}
                >
                  <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className=" bg-gradient-to-r from-sky-700 to-indigo-500 mb-8 mx-auto rounded-md p-5 shadow-2xl shadow-sky-500 hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center">
            <h2 className="text-gray-100 text-2xl font-medium mb-2">
              <img
                className="w-full h-20 object-cover mb-4 rounded-t-md"
                src={image}
                alt={title}
              />
            </h2>
            <div className="text-gray-400 mr-2">投稿日: {date}</div>
            {tags.map((tag: string, index: number) => (
              <span
                className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium mr-2 hover:bg-sky-700"
                key={index}
              >
                <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
                {/* titleを押すと遷移するaタグだからインライン要素なので子要素がないように！ */}
                <Link href={`/posts/${slug}`} className="animate-pulse ">
                  {title}
                </Link>
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
