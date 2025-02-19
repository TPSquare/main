#include <bits/stdc++.h>
using namespace std;

#define _begin(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(file) + ".inp").c_str(), "r", stdin); freopen((string(file) + ".out").c_str(), "w", stdout);
#define _end return 0;
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ROF(i, a, b) for (i = a; i > b; i--)
#define all(var) var.begin(), var.end()
#define B begin()
#define E end()
#define S size()


long long n, t, x, i;
int main() {
    _begin("avr");
    cin >> n >> t;
    cout << t << " ";
    FOR(i, 1, n) {
        cin >> x;
        x = x * (i + 1) - t;
        t += x;
        cout << x << " ";
    }
    _end;
}
