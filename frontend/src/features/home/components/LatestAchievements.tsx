import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import type { Achievement } from "../../../types";

import { formatDate, levelBadgeClass } from "../../../utils";

import {
    STORAGE_URL,
    FALLBACK_IMAGE,
} from "../../../constants";

interface LatestAchievementsProps {
    achievements: Achievement[];
    loading: boolean;
}

export default function LatestAchievements({

    achievements,

    loading,

}: LatestAchievementsProps) {

    return (

        <section className="prestasi-section">

            <div className="prestasi-header">

                <div className="prestasi-title-wrapper">

                    <span className="line-accent"></span>

                    <h3>Prestasi Terbaru</h3>

                </div>

                <Link
                    to="/prestasi"
                    className="link-semua"
                >
                    Lihat semua prestasi

                    <FaArrowRight
                        className="link-icon"
                    />

                </Link>

            </div>

            {loading && (

                <div className="prestasi-grid">

                    {[1,2,3].map((i)=>(
                        <div
                            key={i}
                            className="prestasi-card prestasi-card--skeleton"
                        >

                            <div className="skeleton-img"/>

                            <div className="card-content">

                                <div className="skeleton-line skeleton-line--short"/>

                                <div className="skeleton-line"/>

                                <div className="skeleton-line skeleton-line--medium"/>

                            </div>

                        </div>
                    ))}

                </div>

            )}

            {!loading && (

                <div className="prestasi-grid">

                    {achievements.length===0 ? (

                        <p
                            style={{
                                color:"#888",
                                padding:"24px 0"
                            }}
                        >

                            Belum ada prestasi yang dipublikasikan.

                        </p>

                    ) : (

                        achievements.map((item)=>(

                            <div
                                key={item.id}
                                className="prestasi-card"
                            >

                                <img

                                    src={
                                        item.thumbnail_url
                                            ? `${STORAGE_URL}/${item.thumbnail_url.replace(/^.*\/storage\//,"")}`
                                            : FALLBACK_IMAGE
                                    }

                                    alt={item.title}

                                    className="card-image"

                                    onError={(e)=>{

                                        (
                                            e.target as HTMLImageElement
                                        ).src=FALLBACK_IMAGE;

                                    }}

                                />

                                <div className="card-content">

                                    <div className="card-meta">

                                        <div className="card-tags">

                                            <span
                                                className={`tag-tingkat ${levelBadgeClass(item.level,"tag")}`}
                                            >

                                                {item.level}

                                            </span>

                                            {item.category?.name && (

                                                <span
                                                    className="tag-kategori"
                                                >

                                                    {item.category.name}

                                                </span>

                                            )}

                                        </div>

                                        <span className="card-date">

                                            {formatDate(item.achievement_date)}

                                        </span>

                                    </div>

                                    <h4 className="card-title">

                                        {item.title}

                                    </h4>

                                    <p className="card-desc">

                                        {item.short_description}

                                    </p>

                                    <Link

                                        to={`/prestasi/${item.slug}`}

                                        className="card-link"

                                    >

                                        Lihat Detail

                                        <FaArrowRight
                                            style={{
                                                marginLeft:4,
                                                fontSize:10
                                            }}
                                        />

                                    </Link>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}

        </section>

    );

}
