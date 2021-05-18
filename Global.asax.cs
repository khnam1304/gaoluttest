using System.Web.Mvc;
using System.Web.Routing;
using static ASP.Web.Core.App_Start.RouteConfig;

namespace Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class WebDonaviAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "WebDonavi";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "WebDonavi_default",
                "WebDonavi/{controller}/{action}/{id}",
              new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
    public class MvcApplication : ASP.Web.Core.MvcApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                "Default" // Route name
                , "{controller}/{action}/{id}" // URL with parameters
                , new { area = "WebDonavi", controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
                , new[] { "ASP.WebDonavi.Controllers" } // Namespace of controllers in root area
            );

            
        }
    }
}