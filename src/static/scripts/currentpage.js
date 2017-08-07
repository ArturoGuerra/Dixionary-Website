var pages = [
{href: '/', id: "Home", content: "Home"},
{href: "/dixionary", id: "dixionary", content: "Dixionary"},
{href: "/search", id: "search", content: "Search"},
{href: "/translate", id: "translate", content: "Translate"},
{href: "/apinfo", id: "apinfo", content: "API Info"},
{href: "/status", id: "status", content: "Status"},
{href: "/servers", id: "servers", content: "Servers"},
{href: "/dashboard/main", id: "dashboard", content: "Dashboard"}
]
var currentpage = '/' + location.href.split("/").slice(-1);
console.log(currentpage);
pages.forEach(function(page) {
    if (page.href == currentpage) {
        console.log(`${page.href} ${page.id}`);
        document.getElementById(page.id).classList.add("is-active");
    }
});
