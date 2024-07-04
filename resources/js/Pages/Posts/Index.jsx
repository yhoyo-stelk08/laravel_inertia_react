import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function AllPostPage({ auth, posts }) {
    const { data, setData, post, errors, processing, reset, clearErrors } =
        useForm({
            body: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
            onSuccess: () => {
                reset("body");
            },
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        clearErrors("body");
        const body = e.target.value;
        setData("body", body);
    };

    const refreshPost = (e) => {
        router.visit(route("posts.index"), {
            method: "get",
            only: ["posts"],
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 "
                    >
                        <label htmlFor="body" className="sr-only">
                            Body
                        </label>
                        <textarea
                            onChange={handleChange}
                            value={data.body}
                            name="body"
                            id="body"
                            cols="30"
                            rows="5"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                        ></textarea>
                        {errors.body && (
                            <p className="text-red-400 p-2">{errors.body}</p>
                        )}
                        <button
                            type="submit"
                            className={`mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white ${
                                processing && "opacity-50"
                            }`}
                            disabled={processing}
                        >
                            Post
                        </button>
                    </form>

                    <div className="flex py-3 justify-center">
                        {/* <button type="button" onClick={refreshPost}>
                            Refresh Post
                        </button> */}
                        <Link
                            type="button"
                            href={route("posts.index")}
                            only={["posts"]}
                            preserveScroll
                        >
                            Refresh Post
                        </Link>
                    </div>

                    {posts.data.map((post) => {
                        return (
                            <div
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                                key={post.id}
                            >
                                <div className="mt-2 mb-8">
                                    <div className="font-semibold  mx-2 pl-4 text-gray-500">
                                        Posted by {post.user.name}
                                    </div>
                                    <div className="px-6 py-2 text-gray-900">
                                        {post.body}
                                    </div>
                                    <h1 className="text-xs mt-1 mb-1 mx-2 pl-4 text-gray-500">
                                        {post.created_at}
                                    </h1>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
