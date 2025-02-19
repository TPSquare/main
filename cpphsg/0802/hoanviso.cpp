#include <bits/stdc++.h>
using namespace std;

string s;
int t;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("hoanviso.inp", "r", stdin);
    freopen("hoanviso.out", "w", stdout);
    cin >> s;
    for (char x : s) t += x - '0';
    if (t % 3 != 0) {
        cout << -1;
        return 0;
    }
    sort(s.begin(), s.end(), greater<char>());
    if (s[s.size() - 1] != '0') {
        cout << -1;
        return 0;
    }
    cout << s;
    return 0;
}

