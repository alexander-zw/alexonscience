import React from "react";
import Helmet from "react-helmet";

import { allViews, getTitle, getURL } from "./AllViews";

/**
 * This subcomponent adds meta tags to a view, fetching data from AllViews.ts.
 *
 * Although the static prerendered files already have the correct tags, it's
 * still necessary to dynamically insert these tags in case the user navigated
 * to the view client-side.
 */

interface MetaTagsProps {
    path: string;
}

export default function MetaTags(props: MetaTagsProps) {
    const view = allViews[props.path];
    if (!view) {
        return <></>;
    }

    const title = getTitle(view);
    const url = getURL(props.path);
    const ogImage = view.image ? view.image : "/preview.jpg";

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={view.description} />
            <meta name="keywords" content={view.keywords} />
            <meta name="author" content="Alexander Wu" />
            <link rel="canonical" href={url} />
            <link rel="icon" href="/favicon.ico" />

            <meta property="og:title" content={title} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={view.description} />
        </Helmet>
    );
}
