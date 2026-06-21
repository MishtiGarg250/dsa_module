const ENDPOINT = "https://leetcode.com/graphql";

export async function getLeetcodeProblem(slug: string) {
    const query = `
        query getQuestionDetail($titleSlug: String){
          question(titleSlug: $titleSlug){
           title 
           difficulty
           }
        }
    `;

    const response = await fetch(
        ENDPOINT,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                query,
                variables:{
                    titleSlug: slug,
                }
            }),
            cache:"no-store",

        }
    );

    const data = await response.json();
    return data.data.question;
}