using System;
using System.Collections.Generic;
using System.Text;

namespace MobileSimulator
{
    class LoginResponse
    {
        public string Token { get; set; }
        public string Expiration { get; set; }
        public string Role { get; set; }
    }
}
