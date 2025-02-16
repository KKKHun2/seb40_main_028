import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Loading from "../Loading";

const YouTubeContainer = () => {
  const API = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);

  const getVideo = async () => {
    try {
      const res = await axios.get(
        `https://api.apify.com/v2/acts/jupri~youtube-browser/runs/last/dataset/items?token=apify_api_${API}`
      );
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    const handleUnSelected = () => {
      setSelectedVideo(null);
    };
    window.addEventListener("click", handleUnSelected);
    return () => {
      window.removeEventListener("click", handleUnSelected);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-between max-h-[15em] min-h-[15em] py-4 overflow-x-scroll overflow-y-hidden">
      <Swiper
        slidesPerView={1.3}
        speed={400}
        spaceBetween={30}
        centeredSlides={false}
        modules={[Pagination]}
        className="mySwiper"
      >
        <div className="flex w-full ">
          {videos ? (
            videos.map((video, idx) => {
              const videoUrl = video.url;
              return (
                <SwiperSlide key={idx}>
                  <div
                    role="presentation"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(idx);
                    }}
                    className="image-div pl-[4em] flex flex-col text-sm font-semibold min-w-[25em] h-full text-center first:ml-[-2em] "
                  >
                    {selectedVideo === idx ? (
                      <div className="w-full relative ">
                        <img
                          src={
                            video?.thumbnails?.[0]?.url ?? defaultThumbnailImage
                          }
                          className="thumnails w-[28em] object-contain rounded-md aspect-video overflow-hidden blur-[0.1em] "
                          alt="video-thumbnails"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            window.open(videoUrl);
                          }}
                          className=" absolute left-[40%] ease-out duration-150 top-[40%] font-semibold text-white bg-d-button hover:bg-d-button-hover rounded-md p-2"
                        >
                          보러가기
                        </button>
                      </div>
                    ) : (
                      <img
                        src={
                          video?.thumbnails?.[0]?.url ??
                          "https://i.ytimg.com/vi/IyoJehk7mO0/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLARi2iuXphs3fJiZDzRi1piwRkTNg"
                        }
                        className="thumnails max-h-inital w-[28em] object-contain rounded-md aspect-video overflow-hidden "
                        alt="video-thumbnails"
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div>
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="max-h-inital min-w-[359px] min-h-[202px] rounded-md pb-3 overflow-hidden bg-d-light flex items-center justify-center first:ml-[2em]">
                      <Loading />
                    </div>
                  </SwiperSlide>
                ))}
            </div>
          )}
        </div>
      </Swiper>
    </div>
  );
};

export default YouTubeContainer;
