using System;
using System.Threading.Tasks;

namespace MobileSimulator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Press any button to accept deliverable!");
            Console.ReadLine();

            Task.Run(() => new Simulator().StartAsync()).GetAwaiter().GetResult();

            Console.WriteLine("Deliverable is delivered!");
        }
    }
}
