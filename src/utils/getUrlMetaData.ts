import axios from "axios";
import { load } from "cheerio";

export async function getUrlMetaData(url: string) {
    const { data } = await axios.get(url);
    const $ = load(data);
    const metaTitle = $('head > title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
    const metaImage = $('meta[property="og:image"]').attr('content');

    return {
        title: metaTitle,
        description: metaDescription,
        image: metaImage,
    };
}