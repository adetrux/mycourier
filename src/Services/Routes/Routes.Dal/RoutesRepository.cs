using Routes.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Routes.Dal
{
    public class RoutesRepository : IRoutesRepository
    {
        public Task<IEnumerable<Route>> GetRoutes()
        {
            throw new NotImplementedException();
        }
    }
}
