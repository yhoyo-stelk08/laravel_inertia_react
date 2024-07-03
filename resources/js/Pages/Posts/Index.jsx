import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AllPostPage({ auth, posts }) {
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {posts.data.map((post) => {
                            return (
                                <div key={post.id} className="mt-4 mb-8">
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
