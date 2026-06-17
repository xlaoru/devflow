import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { api } from "@/lib/api";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { Question } from "@/types/global";
import Link from "next/link";

const questions: Question[] = [
  {
    _id: "1",
    title: "How to learn React",
    description: "",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "Dan",
      image:
        "data:image/jpeg;base64,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",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript",
    description: "",
    tags: [{ _id: "2", name: "JavaScript" }],
    author: {
      _id: "1",
      name: "Tim Cook",
      image:
        "data:image/jpeg;base64,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",
    },
    upvotes: 100,
    answers: 15,
    views: 1005,
    createdAt: new Date("2021-09-01"),
  },
];

const test = async () => {
  try {
    return await api.users.getAll();
  } catch (error) {
    return handleError(error);
  }
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const users = await test();

  console.log(users);

  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light_900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route={"/"}
          imgSrc={"/icons/search.svg"}
          placeholder={"Search questions..."}
          otherClasses={"flex-1"}
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
