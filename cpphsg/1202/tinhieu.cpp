#include <bits/stdc++.h>
using namespace std;

#define _begin(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(file) + ".inp").c_str(), "r", stdin); freopen((string(file) + ".out").c_str(), "w", stdout);
#define _end return 0;
#define FOR(i, a, b) for (i = a; i < b; i++)
#define FORs(i, a, b) for (i = a; i <= b; i++)
#define ROF(i, a, b) for (i = a; i > b; i--)
#define all(var) var.begin(), var.end()
#define B begin()
#define E end()
#define S size()

const int N = 1000005;
int n, i, res, x, j;
int b0[N], b1[N];
int main() {
    _begin("tinhieu");
    cin >> n;
    FORs(i, 1, n) {
        cin >> x;
        b1[i] = b1[i - 1];
        b0[i] = b0[i - 1];
        if (x) ++b1[i];
        else ++b0[i];
    }
    FORs(i, 1, n)
        FORs(j, i + 1, n)
            if (b1[j] - b1[i - 1] == b0[j] - b0[i - 1]) ++res;
    cout << res;
    _end;
}
