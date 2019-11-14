using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Ex1_C_.Models;

namespace Ex1_C_.Controllers
{
    [Route("api/[controller]")]
    public class CalculatorController : Controller
    {
        #region Postman Testing

        // GET api/calculator
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/Calculator/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/Calculator
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/Calculator/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/Calculator/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        #endregion

        /**
            used for generating which questions to submit.
        */
        //GetRands api/Calculator/GetFiveRandomNumbers
        [HttpGet("GetFiveRandomNumbers")]
        public List<int> GetFiveRandomNumbers()
        {
            List<int> list = new List<int>();
            Random rand = new Random();
            int count = 0;

            int tmp = 0;

            while( count < 5 )
            {
                tmp = rand.Next(1,21);
                if(!list.Contains(tmp))
                {
                    list.Add(tmp);
                    ++count;
                }
            }

            return list;
        }
    }
}
