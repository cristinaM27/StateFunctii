using StateFunctii.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
namespace StateFunctii.Controllers
{
    public class CadreDidactice1Controller : ApiController
    {

        //Afiseaza cadre
        [HttpGet]
        public List<CadreDidactice> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1= "select * from CadreDidactice where Departament in (select id from Departament where Facultate in (select id from Facultate where Universitate ='"+id+"'))";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<CadreDidactice>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new CadreDidactice
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    nume = reader["nume"].ToString(),
                    prenume = reader["prenume"].ToString(),
                    Departament = Int32.Parse((reader["Departament"]).ToString()),
                    Pozitia = Int32.Parse((reader["Pozitia"]).ToString()),
                    Titlu = Int32.Parse((reader["Titlu"]).ToString()),
                    Titular = Int32.Parse((reader["titular"]).ToString()),
                    // Pozitia = reader["Pozitia"] == null ? 0 : (int)reader["Pozitia"]
                });
            }
            conn.Close();
            return list;
        }

        //Stergere cadru
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "delete from CadreDidactice where id= '" + id + "'";
            var com = new SqlCommand(query1, conn);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, "Sters");
        }

        //Modificare cadru
        [HttpPut]
        public HttpResponseMessage Update(int id, [FromBody]CadreDidactice cadru)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "update CadreDidactice set nume=@nume, prenume=@prenume, Departament=@dep, Pozitia=@poz , Titlu=@tit, Titular=@titular where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            CadreDidactice cadru1 = ObtineCadru(id);
            if (cadru1.nume == cadru.nume && cadru1.prenume == cadru.prenume && cadru1.Departament == cadru.Departament && cadru1.Pozitia == cadru.Pozitia && cadru1.Titlu == cadru.Titlu && cadru1.Titular == cadru.Titular)
            //if (object.Equals(cadru1,cadru))
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Nu sunt campuri de actualizat");
            }
            else
            {
                com.Parameters.AddWithValue("@nume", cadru.nume);
                com.Parameters.AddWithValue("@prenume", cadru.prenume);
                com.Parameters.AddWithValue("@dep", cadru.Departament);
                com.Parameters.AddWithValue("@poz", cadru.Pozitia);
                com.Parameters.AddWithValue("@tit", cadru.Titlu);
                com.Parameters.AddWithValue("@titular", cadru.Titular);

                com.ExecuteNonQuery();
                conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, cadru);
            }
        }

        public CadreDidactice ObtineCadru(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "select * from CadreDidactice where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            SqlDataReader reader = com.ExecuteReader();
            CadreDidactice cadru = null;
            while (reader.Read())
            {
                cadru = new CadreDidactice
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    nume = reader["nume"].ToString(),
                    prenume = reader["prenume"].ToString(),
                    Departament = Int32.Parse((reader["Departament"]).ToString()),
                    Pozitia = Int32.Parse((reader["Pozitia"]).ToString()),
                    Titlu = Int32.Parse((reader["Titlu"]).ToString()),
                    Titular = Int32.Parse((reader["titular"]).ToString())
                };

            }
            conn.Close();
            return cadru;
        }

        //Adaugare cadru
        [HttpPost]
        public HttpResponseMessage Insert([FromBody]CadreDidactice cadru)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "insert into CadreDidactice(nume,prenume,Departament,Pozitia,Titlu,Titular) values (@nume,@prenume,@dep,@poz,@tit,@titular)";
            var com = new SqlCommand(query, conn);
            com.Parameters.AddWithValue("@nume", cadru.nume);
            com.Parameters.AddWithValue("@prenume", cadru.prenume);
            com.Parameters.AddWithValue("@dep", cadru.Departament);
            com.Parameters.AddWithValue("@poz", cadru.Pozitia);
            com.Parameters.AddWithValue("@tit", cadru.Titlu);
            com.Parameters.AddWithValue("@titular", cadru.Titular);

            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, cadru);
        }
    }
}
