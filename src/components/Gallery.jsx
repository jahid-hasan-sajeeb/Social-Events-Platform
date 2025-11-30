import React from "react";

const Gallery = () => {
    const photos = [
        "https://www.bdclean.org/asset/images/koushol/shochetonota.jpg",
        "https://www.bdclean.org/storage/media-print-online/images/1751801138_5334_515678722_710386361918182_3754843977889604729_n.jpg",
        "https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1x694528/uploads/dten/2019/08/img-7569-1565079446035.jpg?watermark=media%2F2023%2F05%2F28%2F1280px-Dhaka_Tribune_Logo.svg-1-a9e61c86dded62d74300fef48fee558f.png",
        "https://observerbd.com/2018/06/20/1529514338.jpg",
        "https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2024/05/06/bd_clean_6.jpg",
        "https://dscdn.daily-sun.com/english/uploads/news_photos/2022/06/04/DS---20--04-06-2022.jpg"
    ];

    return (
        <section className="bg-black px-4 py-20">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-3">
                    Event <span className="text-green-500">Gallery</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-10">
                    Moments captured from different community-driven activities.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                    {photos.map((src, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden rounded-lg border border-gray-800 hover:scale-[1.03] transition-transform"
                        >
                            <img
                                src={src}
                                alt="Event"
                                className="w-full h-40 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
