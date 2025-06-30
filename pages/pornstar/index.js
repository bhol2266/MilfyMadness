import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchIcon } from '@heroicons/react/solid';
import PopunderAds from '../../components/Ads/Popunder';
import pornstarNameList from '../../JsonData/pornstarlist/alldata.json';

function Index({ trendingModels }) {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const router = useRouter();
    const pornstarlist = require(`../../JsonData/pornstarlist/page1.json`);

    const [data, setdata] = useState(pornstarlist);
    const [page, setpage] = useState(1);
    const [suggestedData, setsuggestedData] = useState([]);

    const fetchMoreData = () => {
        const nextPage = page + 1;
        const json = require(`../../JsonData/pornstarlist/page${nextPage}.json`);
        setdata(prev => [...prev, ...json]);
        setpage(nextPage);
    };

    const onChangeHandler = (key) => {
        if (key.length === 0) {
            setsuggestedData([]);
        } else if (key.length > 1) {
            const array = pornstarNameList.filter(name =>
                name.Name.toLowerCase().includes(key.trim().toLowerCase())
            );
            setsuggestedData(array.slice(0, 10));
        }
    };

    return (
        <div className="basicMargin mt-2 bg-black min-h-screen text-white">
            <Head>
                <title>The Hottest Pornstars: Watch Free Top Porn Star Videos on MilfyMadness</title>
                <meta name="description" content="Discover the hottest adult film stars and models on the largest FREE adult tube at MilfyMadness.com. Enjoy a wide selection of stunning babes ready to please you 24/7!" />

                <meta property="og:title" content="The Hottest Pornstars: Watch Free Top Porn Star Videos on MilfyMadness" />
                <meta property="og:description" content="Discover the hottest adult film stars and models on the largest FREE adult tube at MilfyMadness.com. Enjoy a wide selection of stunning babes ready to please you 24/7!" />
                <meta name="twitter:title" content="The Hottest Pornstars: Watch Free Top Porn Star Videos on MilfyMadness" />
                <meta name="twitter:description" content="Discover the hottest adult film stars and models on the largest FREE adult tube at MilfyMadness.com. Enjoy a wide selection of stunning babes ready to please you 24/7!" />
                <link rel="canonical" href={`https://www.milfymadness.com/pornstar`} />

            </Head>


            <PopunderAds />

            {/* 🔍 Search Input */}
            <div className="mt-4 transition ease-in-out delay-150">
                <div className="flex my-1 md:w-3/5 md:mx-auto p-2 px-3 border border-gray-700 space-x-2 md:space-x-4 xl:px-[50px] rounded-[15px] bg-gray-900">
                    <SearchIcon className="h-6 w-6 text-gray-400" />
                    <input
                        className="focus:outline-none flex-grow font-inter rounded-lg bg-transparent text-white placeholder-gray-400"
                        type="text"
                        onChange={(e) => onChangeHandler(e.target.value)}
                        placeholder="Search pornstar..."
                    />
                </div>
            </div>

            {/* Suggested Search Results */}
            <div className="mt-1 grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4 md:grid-cols-5 lg:grid-cols-6">
                {suggestedData.length !== 0 && suggestedData.map(pornstar => {
                    const code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'));
                    return (
                        <Link key={pornstar.Name} href={`/pornstar/${code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                            <div className="relative hover:scale-105 transform transition duration-150">
                                <img className="object-cover w-full rounded-lg" src={pornstar.thumbnail} alt={pornstar.Name} loading="lazy" />
                                <h2 className="rounded-b-lg absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center z-10 text-white bg-black bg-opacity-50">
                                    {pornstar.Name}
                                </h2>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Trending Pornstars */}
            <h1 className="mt-6 ml-1 2xl:my-3 text-left text-2xl lg:text-3xl font-Dmsans font-medium w-fit border-b-[3px] border-theme_green">
                Trending Pornstars
            </h1>

            <div className="mt-1 grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4 md:grid-cols-5 lg:grid-cols-6">
                {trendingModels.map(pornstar => {
                    const code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'));
                    return (
                        <Link key={pornstar.Name} href={`/pornstar/${code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                            <div className="relative hover:scale-105 transform transition duration-150">
                                <img className="object-cover w-full rounded-lg" src={pornstar.thumbnail} alt={pornstar.Name} loading="lazy" />
                                <h2 className="rounded-b-lg absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center z-10 text-white bg-black bg-opacity-50">
                                    {pornstar.Name}
                                </h2>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Hottest Pornstars */}
            <h1 className="mt-6 ml-1 2xl:my-3 text-left text-2xl lg:text-3xl font-Dmsans font-medium w-fit border-b-[3px] border-theme_green">
                🔥 Hottest Pornstars
            </h1>

            {suggestedData.length === 0 && (
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={data.length !== 6500}
                >
                    <div className="grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4 md:grid-cols-5 lg:grid-cols-6">
                        {data.map(pornstar => {
                            const code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'));
                            return (
                                <Link key={pornstar.Name} href={`/pornstar/${code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                                    <div className="relative hover:scale-105 transform transition duration-150">
                                        <img className="object-cover w-full rounded-lg" src={pornstar.thumbnail} alt={pornstar.Name} loading="lazy" />
                                        <h2 className="rounded-b-lg absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center z-10 text-white bg-black bg-opacity-50">
                                            {pornstar.Name}
                                        </h2>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Index;

export async function getStaticProps() {
    const res = await fetch(`${process.env.BACKEND_URL}getTrendingPornstars`, {
        method: "POST",
    });
    const data = await res.json();

    return {
        props: {
            trendingModels: data,
        },
    };
}
