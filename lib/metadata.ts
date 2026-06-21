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

  try {
    const response = await fetch(
      ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://leetcode.com/",
        },
        body: JSON.stringify({
          query,
          variables: {
            titleSlug: slug,
          }
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();
    
    if (data?.data?.question) {
      return data.data.question;
    }
  } catch (error) {
    console.warn("Direct LeetCode GraphQL fetch failed, trying proxy fallback:", error);
  }

  // Fallback to proxy if Vercel IPs are strictly blocked by Cloudflare
  try {
    const proxyResponse = await fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${slug}`);
    const proxyData = await proxyResponse.json();
    
    if (proxyData && proxyData.questionTitle) {
      return {
        title: proxyData.questionTitle,
        difficulty: proxyData.difficulty,
      };
    }
  } catch (fallbackError) {
    console.error("Proxy fallback also failed:", fallbackError);
  }

  return null;
}