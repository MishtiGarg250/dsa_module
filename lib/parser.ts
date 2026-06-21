export function detectPlatform(url: string){
    if(url.includes("leetcode.com")){
        return "leetcode";
    }
    return "unknown";
}

export function extractLeetcodeSlug(url: string){
    const match = url.match(
    /leetcode\.com\/problems\/([^/]+)/
  );

  return match?.[1] ?? null;

}