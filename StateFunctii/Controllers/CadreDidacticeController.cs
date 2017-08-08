using StateFunctii.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StateFunctii.Controllers
{
    public class CadreDidacticeController : ApiController
    {
       
        [HttpGet]
        public List<CadreDidactice> Get()
        {
            
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select * from CadreDidactice";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<CadreDidactice>();
            SqlDataReader reader = com.ExecuteReader();
            
            while(reader.Read())
            {
                list.Add(new CadreDidactice {
                    id =Int32.Parse((reader["id"]).ToString()),
                   // Departament=Int32.Parse((reader["Departament"]).ToString()),
                   // Departament=Convert.ToInt32((reader["Departament"]).ToString()),
                    nume=reader["nume"].ToString(),
                    prenume= reader["prenume"].ToString(),
                    titular= Int32.Parse((reader["titular"]).ToString()),
                    //Pozitia = Int32.Parse((reader["Pozitia"]).ToString())
                });  
            }
            conn.Close();
            return list;
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "delete from CadreDidactice where id= '"+id+"'";
            var com = new SqlCommand(query1, conn);
            //CadreDidactice cadre = Get(id);
            int idDB = Get(id);
            if (idDB == 0)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Persoana nu exista");
            }
            else
            {
                com.ExecuteNonQuery();
                conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, "Sters");
            }
            
        }
        public int Get(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "select id from CadreDidactice where id='" + id + "'";
            SqlCommand com = new SqlCommand(query, conn);
            SqlDataReader reader = com.ExecuteReader();
            int idDB = 0;
            while(reader.Read())
            {
                idDB = Int32.Parse((reader["id"]).ToString());
            }
            conn.Close();
           
                return idDB;
        }
        [HttpPut]
        public HttpResponseMessage Update(int id,[FromBody]CadreDidactice cadru)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "update CadreDidactice set Departament=@dep, nume=@nume,prenume=@prenume,titular=@titular,Pozitia=@poz where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            com.Parameters.AddWithValue("@dep", cadru.Departament);
            com.Parameters.AddWithValue("@nume", cadru.nume);
            com.Parameters.AddWithValue("@prenume", cadru.prenume);
            com.Parameters.AddWithValue("@titular", cadru.titular);
            com.Parameters.AddWithValue("@poz", cadru.Pozitia);
            int idDB = Get(id);
            if (idDB == 0)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Persoana nu exista");
            }
            else
            {
                com.ExecuteNonQuery();
                conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK,cadru);
            }
        }
        [HttpPost]
        public HttpResponseMessage Insert([FromBody]CadreDidactice cadru)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "insert into CadreDidactice(Departament,nume,prenume,titular,Pozitia) values (@dep,@nume,@prenume,@titular,@poz)";
            var com = new SqlCommand(query, conn);
            com.Parameters.AddWithValue("@dep", cadru.Departament);
            com.Parameters.AddWithValue("@nume", cadru.nume);
            com.Parameters.AddWithValue("@prenume", cadru.prenume);
            com.Parameters.AddWithValue("@titular", cadru.titular);
            com.Parameters.AddWithValue("@poz", cadru.Pozitia);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, cadru);
            }
        }
}
