#include <bits/stdc++.h>
using namespace std;

string s;
int n, i, j;
int p[100005];
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("bai3.inp", "r", stdin);
    freopen("bai3.out", "w", stdout);
    cin >> s;
    n = s.size();
    for (i = 1; i <= n; i++)
        p[i] = s[i - 1] - '0' + p[i - 1];
    for
    return 0;
}
