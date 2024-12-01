
const BannerText = ({title, date, location}) => {
    return (
        <div className="absolute z-10 bg-black text-left p-6 text-white bottom-20 left-20 w-1/3 opacity-70 space-y-3">
            <h3 className=" text-4xl font-bold text-white">{title}</h3>
            <p> <span className=" font-semibold text-gray-200"> Date: </span>{date}</p>
            <p><span className=" font-semibold text-gray-200"> Location: </span> {location}</p>
            <p className=" text-justify"><span className=" font-semibold text-gray-200"> Description: </span> Join us for a comprehensive health check-up camp offering free screenings and consultations with top healthcare professionals. Services include blood pressure measurement, diabetes testing, vision and dental check-ups, and personalized health advice. Stay proactive about your health and well-being!</p>
        </div>
    );
};

export default BannerText;