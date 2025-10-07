import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";
import MagicCard from "../ui/magic-card";
import { apiListBlogs } from "@/lib/api";
import mockBlogs from "@/utils/constants/blogs.json";

const Blogs = async () => {
  let items: Array<{ slug: string; title: string; description?: string; image?: string }> = [];
  try {
    const res = await apiListBlogs({ page: 1, limit: 12 });
    items = res.items || [];
  } catch {
    items = mockBlogs as any;
  }
  return (
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((blog, id) => (
          <MagicCard key={id} className="p-0 md:p-0 relative">
            <Link href={`/resources/blog/${blog.slug}`} className="w-full h-full absolute -z-1 inset-0"></Link>
            <Card className="group border-0">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-center h-40 lg:h-52 overflow-hidden">
                  <Image
                    src={blog.image || "/assets/blog1.jpg"}
                    alt={blog.title}
                    width={1024}
                    height={1024}
                    unoptimized
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start mt-4">
                  <CardTitle className="text-lg font-semibold text-foreground/80 group-hover:text-foreground transition-all duration-300">
                    {blog.title}
                  </CardTitle>
                  {blog.description && (
                    <CardDescription className="mt-2">
                      {blog.description.length > 100 ? `${blog.description.substring(0, 100)}...` : blog.description}
                    </CardDescription>
                  )}
                </div>
              </CardContent>
            </Card>
          </MagicCard>
        ))}
      </div>
    </div>
  )
};

export default Blogs
