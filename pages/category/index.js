import Link from 'next/link';
import Head from 'next/head';
import PopunderAds from '../../components/Ads/Popunder';
import categoryList from '../../JsonData/categoryList.json';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { shuffle } from '../../config/utils';

function Index() {
    const itemsPerPage = 30;

    const [SuffledCategories] = useState(shuffle(categoryList));
    const [visibleCategories, setVisibleCategories] = useState(SuffledCategories.slice(0, itemsPerPage));
    const [hasMore, setHasMore] = useState(true);
    const [triggered, setTriggered] = useState(false);
    const [scrolledToTOP, setscrolledToTOP] = useState(false);
    const [suggestedData, setsuggestedData] = useState([]);

    const onChangeHandler = (key) => {
        if (key.length === 0) {
            setsuggestedData([]);
        }
        if (key.length > 1) {
            const array = categoryList.filter(obj =>
                obj.categoryName.toLowerCase().includes(key.trim().toLowerCase())
            );
            setsuggestedData(array.slice(0, 10));
        }
    };

    const loadMore = () => {
        const currentLength = visibleCategories.length;
        const moreItems = SuffledCategories.slice(currentLength, currentLength + itemsPerPage);
        setVisibleCategories(prev => [...prev, ...moreItems]);
        if (currentLength + itemsPerPage >= SuffledCategories.length) setHasMore(false);
        setTriggered(false);
    };

    useEffect(() => {
        if (!scrolledToTOP) {
            window.scrollTo(0, 0);
            setscrolledToTOP(true);
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            const scrolledPercentage = (scrollTop + windowHeight) / fullHeight;

            if (scrolledPercentage >= 0.4 && hasMore && !triggered) {
                setTriggered(true);
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleCategories, hasMore, triggered]);

    return (
        <div className="basicMargin bg-black min-h-screen text-white">
            <Head>
                <title>Explore Porn Video Categories and a variety of Sex Niches on MilfyMadness</title>
                <meta name="description" content="Check out our extensive list of all porn video categories on MilfyMadness, featuring even the rarest sex niches. Discover the XXX videos that cater to your preferences!" />


                <meta property="og:title" content="Explore Porn Video Categories and a variety of Sex Niches on MilfyMadness" />
                <meta property="og:description" content="Check out our extensive list of all porn video categories on MilfyMadness, featuring even the rarest sex niches. Discover the XXX videos that cater to your preferences!" />
                <meta name="twitter:title" content="Explore Porn Video Categories and a variety of Sex Niches on MilfyMadness" />
                <meta name="twitter:description" content="Check out our extensive list of all porn video categories on MilfyMadness, featuring even the rarest sex niches. Discover the XXX videos that cater to your preferences!" />
                <link rel="canonical" href={`https://www.milfymadness.com/category`} />




            </Head>
            <div className='flex items-center py-2 my-1 justify-between rounded-lg'>
                <span className='text-center lg:text-left flex-grow text-3xl font-Dmsans'>Top Porn Categories</span>
            </div>

            <h1 className="text-center lg:text-left text-sm md:text-lg pb-2 my-1 font-inter text-gray-300">
                Explore a Variety of Free Videos: Japanese, Hentai, Russian, Chinese, Asian, Korean Porn, and More
            </h1>

            {/* 🔍 Search Bar */}
            <div className="transition ease-in-out delay-150">
                <div className='flex my-1 md:w-3/5 md:mx-auto p-2 px-3 border border-gray-700 space-x-2 md:space-x-4 xl:px-[50px] rounded-[15px] bg-gray-900'>
                    <SearchIcon className='h-6 w-6 text-gray-400' />
                    <input
                        className='focus:outline-none flex-grow font-inter rounded-lg bg-transparent text-white placeholder-gray-400'
                        type='text'
                        onChange={(event) => onChangeHandler(event.target.value)}
                        placeholder='Search category...'
                    />
                </div>
            </div>

            {/* Suggested */}
            <div className="grid grid-cols-3 py-3 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4 md:grid-cols-4 lg:grid-cols-5">
                {suggestedData.length !== 0 && suggestedData.map(obj => (
                    <Link key={obj.categoryName} href={`/category/${obj.categoryName.toLowerCase().trim()}`}>
                        <div className='relative hover:scale-105 transform transition duration-150 rounded aspect-box'>
                            <img
                                className='object-cover w-full rounded-lg'
                                alt={obj.categoryName}
                                src={obj.imageUrl}
                                loading='lazy'
                            />
                            <h2 className='font-inter rounded-b absolute text-sm sm:text-lg px-1 bottom-0 w-full text-center z-10 text-white bg-black bg-opacity-50'>
                                {obj.categoryName}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center text-gray-400">
                <span className="border-b border-gray-700 w-full"></span>
                <span className="mx-4 text-md text-nowrap">All Categories</span>
                <span className="border-b border-gray-700 w-full"></span>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-2 py-3 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4 md:grid-cols-4 lg:grid-cols-5">
                {visibleCategories.map(category => (
                    <Link key={category.categoryName} href={`/category/${category.categoryName.toLowerCase().trim()}`}>
                        <div className='relative hover:scale-105 transform transition duration-150 rounded aspect-box'>
                            <img
                                className='object-cover w-full'
                                alt={category.categoryName}
                                src={category.imageUrl}
                                loading="lazy"
                            />
                            <h2 className="absolute bottom-0 w-full px-1 text-center text-white bg-black bg-opacity-50 z-10 rounded-b font-inter text-xs sm:text-sm lg:text-lg">
                                {category.categoryName}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>

            {!hasMore && (
                <p className="text-center py-4 text-gray-500">
                    <b>All categories loaded</b>
                </p>
            )}

            <PopunderAds />
        </div>
    );
}

export default Index;
