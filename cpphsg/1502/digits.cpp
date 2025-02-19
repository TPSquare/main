#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(file) + ".inp").c_str(), "r", stdin); freopen((string(file) + ".out").c_str(), "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ROFs(i, a, b) for (i = a; i >= b; i--)
#define ll long long
string s;
ll r, i;
unordered_map<char, ll> a, c;
char x;
bool ok() {
    for (auto x : a)
        if (x.second > c[x.first]) return false;
    return true;
}
int main() {
    START("digits");
    cin >> s;
    FOR(i, 0, 10) {
        cin >> x;
        ++c[x];
    }
    for (char x : s) ++a[x];
    while (ok()) {
        ++r;
        for (char x : s) --c[x];
        i = s.size() - 1;
        --a[s[i]++];
        ++a[s[i]];
        ROFs(i, i, 0)
            if (s[i] == ':') {
                --a[':'];
                s[i] = '0';
                ++a['0'];
                if (i > 0) {
                    --a[s[i - 1]++];
                    ++a[s[i - 1]];
                }
            } else break;
        if (s[0] == '0') s = "1" + s;
    }
    cout << r;
    return 0;
}
