using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StateFunctii.Controllers
{
    public class LoginController : ApiController
    {
        [Route("api/Views/Login/SignIn")]
        [HttpPost]
        public HttpResponseMessage SignIn([FromBody] Models.User user)
        {
            try { 
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "select Scurt from Departament where Scurt='" + user.Scurt + "' union select Scurt from Facultate where Scurt='"+user.Scurt+"' union select Scurt from Universitate where Scurt='"+user.Scurt+"'";
            var com1 = new SqlCommand(query, conn);
            string name = com1.ExecuteScalar().ToString().Replace(" ", "");
            conn.Close();
            if (name.Equals(null))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Utilizator inexistent");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }

        }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
          
            }
}
    }
}
