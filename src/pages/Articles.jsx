import React from "react";
import Title from "../hooks/Title";
import Motion from "../components/Motion";

const newsArticles = [
  {
    id: 1,
    title: "Massive Road Cleanup Drive Boosts Citywide Awareness",
    event: "Street Cleanup",
    category: "Awareness",
    date: "Jan 12, 2026",
    coverPhoto: "https://blogs.worldbank.org/content/dam/sites/blogs/img/detail/mgr/ahad_img_4739_0.jpg",
    description:
      "Hundreds of locals joined hands to clear waste from public streets, inspiring citizens to keep their neighborhoods clean.",
    link: "#"
  },
  {
    id: 2,
    title: "Uttara Community Plants 800 New Trees in One Morning",
    event: "Tree Plantation",
    category: "Environment",
    date: "Jan 09, 2026",
    coverPhoto: "https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1/uploads/media/2024/10/27/Tree-9ae87a24d8da6d49473104944c16144d.jpg",
    description:
      "A unified plantation effort brought together students, volunteers, and residents to expand green zones across Uttara.",
    link: "#"
  },
  {
    id: 3,
    title: "Youth-Led Buriganga Cleanup Removes 5 Tons of Waste",
    event: "River Cleanup",
    category: "Awareness",
    date: "Jan 05, 2026",
    coverPhoto: "https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2020/09/20/am5a0121.jpg",
    description:
      "Energetic volunteers cleaned part of the riverbank, spreading awareness on the dire state of water pollution in the area.",
    link: "#"
  },
  {
    id: 4,
    title: "Winter Clothes Donation Brings Warmth to Hundreds",
    event: "Clothes Donation",
    category: "Social Support",
    date: "Dec 28, 2025",
    coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfVGob7tl9TI-3f3OUE9RbGnfPQ6Q1G_575g&s",
    description:
      "Volunteers distributed warm jackets, blankets, and sweaters to vulnerable families affected by harsh winter conditions.",
    link: "#"
  },
  {
    id: 5,
    title: "Health Walk at Dhanmondi Encourages Daily Movement",
    event: "Community Health Walk",
    category: "Health",
    date: "Dec 22, 2025",
    coverPhoto: "https://img.truvvle.com/?src=aHR0cHM6Ly9pbWcudHJhdmVsZmVlZC5pby9oYWZpenVsbGFoJTJGMjAyMDAzMzFUMDMwMDEzODM5Wi1hLTcuanBn&width=1920",
    description:
      "Residents participated in a peaceful lake-side walk to promote heart health, mental well-being, and active living.",
    link: "#"
  },
  {
    id: 6,
    title: "Banani Park Beautification Project Gains Volunteer Speed",
    event: "Park Beautification",
    category: "Environment",
    date: "Jan 15, 2026",
    coverPhoto: "https://waterkeepersbangladesh.org/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-17-at-17.24.39-900x500.jpeg",
    description:
      "Volunteers repainted benches, planted shrubs, and cleaned walkways, giving Banani’s central park a fresh new look.",
    link: "#"
  },
  {
    id: 7,
    title: "Food Distribution Drive Supports Over 1,000 People",
    event: "Food Distribution",
    category: "Social Support",
    date: "Jan 03, 2026",
    coverPhoto: "https://ecdn.dhakatribune.net/contents/cache/images/640x359x1/uploads/media/2024/05/19/OMS-9c7123c40236f9f5194bff6aa21112cd.jpg?jadewits_media_id=20669",
    description:
      "Meal boxes and essential food items were shared with homeless families and low-income workers across Motijheel.",
    link: "#"
  },
  {
    id: 8,
    title: "Local School Launches Recycling Workshop for Students",
    event: "Recycling Workshop",
    category: "Education",
    date: "Jan 11, 2026",
    coverPhoto: "https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/images/2025/09/01/whatsapp_image_2025-09-01_at_10.29.11_am.jpeg",
    description:
      "Students learned practical ways to recycle plastics and fabrics, building long-term eco-friendly habits.",
    link: "#"
  },
  {
    id: 9,
    title: "Community Garden in Mohammadpur Enters Second Phase",
    event: "Community Gardening",
    category: "Environment",
    date: "Jan 14, 2026",
    coverPhoto: "https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2022/06/16/rel_-_03-.jpg",
    description:
      "Residents collaborated to expand a shared garden space, planting herbs, vegetables, and native flowering plants.",
    link: "#"
  }
];


const Articles = () => {
    Title("Articles | OneSociety");

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10">
            <Motion>
                <div className="max-w-6xl mx-auto">
         
                    <header className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            OneSociety <span className="text-green-500">Articles</span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base">
                            All the latest updates of the gaming world.
                        </p>
                    </header>

         
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-zinc-900 border border-gray-800 rounded-2xl p-4 flex flex-col shadow-lg"
                            >
                                {/* Image */}
                                <div className="w-full h-44 bg-zinc-800 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                                    {article.coverPhoto ? (
                                        <img
                                            src={article.coverPhoto}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500 text-sm">
                                            No cover image
                                        </span>
                                    )}
                                </div>

                   
                                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                                    <span className="px-2 py-0.5 rounded-full bg-green-600/20 text-red-400">
                                        {article.category}
                                    </span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-lg font-semibold mb-2">
                                    {article.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                                    {article.description}
                                </p>

               
                                <p className="text-xs text-gray-400 mb-4">
                                    Related event:{" "}
                                    <span className="text-gray-200">{article.event}</span>
                                </p>

                     
                                <a
                                    href={article.link}
                                    className="mt-auto inline-block text-sm bg-green-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition-all duration-300 text-center"
                                >
                                    Read full story
                                </a>
                            </div>
                        ))}
                    </section>
                </div>
            </Motion>
        </div>
    );
};

export default Articles;
