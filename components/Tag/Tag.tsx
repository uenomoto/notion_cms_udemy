import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

export const Tag = (props: Props) => {
  const { tags } = props;
  return (
    <section className="rounded-md p-5 mb-5 xl:p-10 xl:mt-10 md:mx-auto shadow-2xl bg-gradient-to-r from-cyan-600 to-blue-500 xl:col-span-2 text-center">
      <div className="font-bold mb-4">タグ検索</div>
      <div className="flex md:flex-wrap xl:flex-col gap-5">
        {tags.map((tag: string, index: number) => (
          <Link href={`/posts/tag/${tag}/page/1`} key={index}>
            <span className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block hover:bg-sky-700">
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
