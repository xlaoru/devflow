import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const [
    { success: questionSuccess, data: hotQuestions, error: questionError },
    { success: tagSuccess, data: topTags, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <DataRenderer
          success={questionSuccess}
          error={questionError}
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map(({ _id, title }) => (
                <Link
                  href={ROUTES.QUESTION(_id)}
                  key={_id}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {title}
                  </p>
                  <Image
                    src="/icons/chevron-right.svg"
                    width={20}
                    height={20}
                    alt="Chevron"
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <DataRenderer
          success={tagSuccess}
          error={tagError}
          data={topTags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          render={(topTags) => (
            <div className="mt-7 flex flex-col gap-4">
              {topTags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
