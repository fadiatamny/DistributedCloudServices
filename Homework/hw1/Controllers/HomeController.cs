using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using hw1.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace hw1.Controllers
{
    [Route("api/")]
    public class HomeworkController : Controller
    {
        //[9,17,11,5,19]//

        /**
            Question 9
            turn each letter in given string to the next letter in the alphabet

            /api/ShiftLetters
         */
        [HttpGet("ShiftLetters")]
        public string ShiftLetters(string word)
        {
            string tmp = "";
            foreach(char c in word)
            {
                int x = 0;

                if(Char.IsUpper(c))
                    x = ((c - 65)+1)%26+65;
                else
                    x = ((c - 97)+1)%26+97;
                
                tmp += (char)x;
            }
            return tmp;
        }

        /**
            Question 17
            Recieves a number and a string places the number in the POSITION of its value

            /api/PlaceNumber
        */

        [HttpGet("PlaceNumber")]
        public string PlaceNumber(string word,int number)
        {
            if(number <= 0)
                return number+word;
            if(number > word.Length)
                return word+number;

            string[] s = word.Split(word[number-1]);
            return s[0] + number + word[number-1] + s[1];
        }


        /**
            Question 11
            flip letters order in string

            /api/flipletters
        */
        [HttpGet("FlipLetters")]
        public string FlipLetters(string word)
        {
            return new string(word.ToCharArray().Reverse().ToArray());
        }


        /**
            Question 5
            check if two strings are equal to eachother ignoring cases

            /api/Matching
        */
        [HttpPost("Matching")]
        public bool Matching([FromBody]List<string> words)
        {
            return words[0].ToLower() == words[1].ToLower();
        }

        /**
            Question 19
            print all the numbers before given number till equilibrium

            /api/equilibrium
        */
        [HttpGet("Equilibrium")]
        public List<int> Equilibrium(int number)
        {
            List<int> l = new List<int>();
            
            if(number > 0) { while(number > 0 ) l.Add(number--); }
            if(number < 0) { while(number < 0 ) l.Add(number++); }

            return l;
        }


        /**
            used for generating which questions to submit.
            /api/GetFiveRandomNumbers
        */
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
