using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;
using StateFunctii.Models;

namespace StateFunctii.Controllers
{
    public class CrudGrupeAnController : ApiController
    {
        //Afisare grupe
        [HttpGet]
        public List<Models.Grupa> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select a.cod_pi,a.nr_grupe, a.nr_subgr , b.An,c.Facultate from Grupe a inner join An b on a.an=b.id inner join Facultate c on a.Facultate=c.id where a.Facultate='"+id+"'";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<Grupa>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new Grupa
                {
                    cod_pi = reader["cod_pi"].ToString(),
                    An = reader["An"].ToString(),
                    nr_grupe = Int32.Parse((reader["nr_grupe"]).ToString()),
                    nr_subgr = Int32.Parse((reader["nr_subgr"]).ToString()),
                    Facultate = reader["Facultate"].ToString(),
                });
            }
            conn.Close();
            return list;
        }
        [HttpDelete]
        public HttpResponseMessage Delete(string cod_pi)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "delete from Grupe where cod_pi= '" + cod_pi + "'";
            var com = new SqlCommand(query1, conn);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, "Sters");
        }
        [HttpPost]
        public HttpResponseMessage Insert([FromBody]Grupa1 grupa)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "insert into Grupe(cod_pi,an,nr_grupe,nr_subgr,Facultate) values (@pi,@an,@gr,@subgr,@fac) ";
            var com = new SqlCommand(query, conn);
            com.Parameters.AddWithValue("@pi", grupa.cod_pi);
            com.Parameters.AddWithValue("@an", grupa.An);
            com.Parameters.AddWithValue("@gr", grupa.nr_grupe);
            com.Parameters.AddWithValue("@subgr", grupa.nr_subgr);
            com.Parameters.AddWithValue("@fac", grupa.Facultate);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK,grupa);
        }
    }
}
